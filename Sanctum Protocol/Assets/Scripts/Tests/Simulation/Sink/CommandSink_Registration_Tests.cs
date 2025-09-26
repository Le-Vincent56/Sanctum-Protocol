using System.Collections.Generic;
using System.Linq;
using NUnit.Framework;
using SanctumProtocol.Simulation.Abstractions.Contracts;
using SanctumProtocol.Simulation.Core;

namespace SanctumProtocol.Tests.Simulation.Sink;

public class CommandSinkRegistrationTests
{
    [Test] 
    public void RegisterHandler_RoutesCorrectly()
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
    public void RegisterLambda_RoutesCorrectly()
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
}
