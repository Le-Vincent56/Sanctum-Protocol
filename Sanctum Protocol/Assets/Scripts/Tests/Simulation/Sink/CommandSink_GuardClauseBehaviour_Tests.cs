using System;
using System.Collections.Generic;
using NUnit.Framework;
using SanctumProtocol.Simulation.Abstractions.Contracts;
using SanctumProtocol.Simulation.Core;

namespace SanctumProtocol.Tests.Simulation.Sink;

public sealed class CommandSinkGuardClauseBehaviourTests
{
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
    public void Handler_ExceptionHandler_ReturnsExceptionMessage()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        
        // Act/Assert: The exception is thrown from the handler
        sink.Register(new ThrowingHandler());
        InvalidOperationException ex = Assert.Throws<InvalidOperationException>(() => sink.Handle(new Foo("x")));
        Assert.AreEqual("boom", ex.Message);
    }

    [Test]
    public void Handler_AfterException_RoutingStillWorks()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        sink.Register(new ThrowingHandler());
        sink.Register(new BarHandler());
        
        // Act/Assert: The exception is thrown from the handler
        InvalidOperationException ex = Assert.Throws<InvalidOperationException>(() => sink.Handle(new Foo("x")));
        Assert.AreEqual("boom", ex.Message);

        IReadOnlyList<IDomainEvent> evts = sink.Handle(new Bar(10));
        Assert.AreEqual(10, ((BarFoo)evts[0]).Amount);
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
    
    [Test]
    public void Handler_ConcreteTypeInsured()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        sink.Register(new FooTwoHandler());
        
        // Act
        Assert.Throws<ArgumentException>(() => sink.Handle(new FooTwo("Hello World")));
    }
}