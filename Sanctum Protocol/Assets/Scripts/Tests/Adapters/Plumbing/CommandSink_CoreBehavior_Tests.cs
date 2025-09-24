using System;
using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using SanctumProtocol.Adapters.Messaging;
using SanctumProtocol.Adapters.Routing;
using SanctumProtocol.Simulation.Abstractions.Contracts;
using SanctumProtocol.Simulation.Core;

namespace SanctumProtocol.Tests.Adapters.Plumbing;

public sealed class CommandSinkCoreBehaviorTests
{
    [Test]
    public void OneSink_StronglyTypedRoutes_DispatchesToSubscribers()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        sink.Register(new FooHandler());
        sink.Register(new BarHandler());
        
        EventDispatcher dispatcher = new EventDispatcher();
        CommandRouter router = new CommandRouter(sink, dispatcher);

        int fooBar = 0;
        int barFoo = 0;
        
        using IDisposable subscriber1 = dispatcher.Subscribe<FooBar>(_ => fooBar++);
        using IDisposable subscriber2 = dispatcher.Subscribe<BarFoo>(_ => barFoo++);
        
        // Act
        router.Submit(new Foo("Hello"));
        router.Submit(new Bar(10));
        
        // Assert: both events have been handled
        Assert.AreEqual(1, fooBar);
        Assert.AreEqual(1, barFoo);
    }
    
    [Test]
    public void Handle_NullCommand_ReturnsEmptyList()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        
        // Act
        IReadOnlyList<IDomainEvent> evts = sink.Handle(null);
        
        // Assert: An empty list is returned from a null command
        Assert.IsNotNull(evts);
        Assert.AreEqual(0, evts.Count);
    }
    
    [Test]
    public void Register_NullHandler_Throws()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        
        // Act/Assert: Registering a null handler throws an ArgumentNullException
        Assert.Throws<ArgumentNullException>(() => sink.Register((ICommandHandler<Foo>)null));
    }
    
    [Test]
    public void Register_NullFunc_Throws()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        
        // Act/Assert: Registering a null function throws an ArgumentNullException
        Assert.Throws<ArgumentNullException>(() => sink.Register((Func<Bar, IReadOnlyList<IDomainEvent>>)null));
    }
    
    [Test]
    public void Register_Handler_Routes_Correctly()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        sink.Register(new FooHandler());
        
        // Act
        IReadOnlyList<IDomainEvent> evts = sink.Handle(new Foo("Hello World"));
        
        // Assert: The handler has been invoked, and the correct event has been produced
        Assert.AreEqual(1, evts.Count);
        Assert.IsInstanceOf<FooBar>(evts[0]);
        Assert.AreEqual("Hello World", ((FooBar)evts[0]).Message);
    }
    
    [Test]
    public void Register_Lambda_Routes_Correctly()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        sink.Register<Bar>(p => new IDomainEvent[] { new BarFoo(p.Amount) });
        
        // Act
        IReadOnlyList<IDomainEvent> evts = sink.Handle(new Bar(7));
        
        // Assert: The handler has been invoked, and the correct event has been produced
        Assert.AreEqual(1, evts.Count);
        Assert.IsInstanceOf<BarFoo>(evts[0]);
        Assert.AreEqual(7, ((BarFoo)evts[0]).Amount);
    }
    
    [Test]
    public void MultipleRegistrations_DifferentTypes_RouteIndependently()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        sink.Register(new FooHandler());
        sink.Register(new BarHandler());

        // Act
        IReadOnlyList<IDomainEvent> events1 = sink.Handle(new Foo("A"));
        IReadOnlyList<IDomainEvent> events2 = sink.Handle(new Bar(3));

        // Assert: Each command type has been routed to its own handler
        Assert.IsInstanceOf<FooBar>(events1.Single());
        Assert.IsInstanceOf<BarFoo>(events2.Single());
    }

    [Test]
    public void ReRegister_SameType_OverridesPreviousHandler()
    {
        // Arrange
        CommandSink sink = new CommandSink();

        // Act
        sink.Register<Foo>(_ => new IDomainEvent[] { new FooBar("old") });
        sink.Register<Foo>(_ => new IDomainEvent[] { new FooBar("new") });
        IReadOnlyList<IDomainEvent> evts = sink.Handle(new Foo("ignored"));
        
        // Assert: The old handler gets overwritten, and the new one is invoked
        Assert.AreEqual("new", ((FooBar)evts.Single()).Message);
    }

    [Test]
    public void Handler_Exception_Bubbles_Out_Of_Sink()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        
        // Act/Assert: The exception is thrown from the handler
        sink.Register(new ThrowingHandler());
        InvalidOperationException ex = Assert.Throws<InvalidOperationException>(() => sink.Handle(new Foo("x")));
        Assert.AreEqual("boom", ex.Message);
    }

    [Test]
    public void DerivedCommand_DoesNotMatch_BaseRegistration_ByDesign_Throws()
    {
        // Arrange: Registered for Foo, but not DerivedFoo
        CommandSink sink = new CommandSink();
        sink.Register(new FooHandler()); 
        
        // Act/Assert: The exception is thrown from the handler
        Assert.Throws<ArgumentException>(() => sink.Handle(new DerivedFoo("Hello World")));
    }
}