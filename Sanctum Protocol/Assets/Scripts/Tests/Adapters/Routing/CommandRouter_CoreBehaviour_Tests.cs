using System;
using System.Collections.Generic;
using NUnit.Framework;
using SanctumProtocol.Adapters.Messaging;
using SanctumProtocol.Adapters.Routing;
using SanctumProtocol.Simulation.Abstractions.Contracts;
using SanctumProtocol.Simulation.Core;

namespace SanctumProtocol.Tests.Adapters.Routing;

public sealed class CommandRouterCoreBehaviourTests
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
        
        // Act: Submit the commands
        router.Submit(new Foo("Hello"));
        router.Submit(new Bar(10));
        
        // Assert: both events have been handled
        Assert.AreEqual(1, fooBar);
        Assert.AreEqual(1, barFoo);
    }

    [Test]
    public void Router_ReturnsSameEventsAsSink()
    {
        // Arrange
        CommandSink sink = new CommandSink();

        List<IDomainEvent> sharedEvents = new List<IDomainEvent>(3)
        {
            new FooBar("First Message"),
            new FooBar("Second Message"),
            new FooBar("Third Message"),       
        };
        
        sink.Register<Foo>(_ => sharedEvents);
        EventDispatcher dispatcher = new EventDispatcher();
        CommandRouter router = new CommandRouter(sink, dispatcher);

        int foo = 0;
        using IDisposable subscriber = dispatcher.Subscribe<FooBar>(_ => foo++);

        // Act
        IReadOnlyList<IDomainEvent> events = router.Submit(new Foo("Ignored"));
        
        // Assert
        Assert.AreEqual(3, foo);
        Assert.AreEqual(3, events.Count);
        Assert.AreSame(events, sharedEvents);
        Assert.AreEqual("First Message", ((FooBar)events[0]).Message);
        Assert.AreEqual("Second Message", ((FooBar)events[1]).Message);
        Assert.AreEqual("Third Message", ((FooBar)events[2]).Message);
    }

    [Test]
    public void Router_DispatchAfterSink()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        List<string> log = new List<string>();

        IReadOnlyList<IDomainEvent> LogSink(IGameCommand command)
        {
            log.Add("SINK CALLED");
            return new List<IDomainEvent>() { new FooBar(((Foo)command).Message) };
        }
        
        sink.Register<Foo>(LogSink);

        EventDispatcher dispatcher = new EventDispatcher();
        CommandRouter router = new CommandRouter(sink, dispatcher);
        
        using IDisposable subscriber = dispatcher.Subscribe<FooBar>(evt => log.Add("DISPATCHER CALLED"));
        
        // Act
        IReadOnlyList<IDomainEvent> events = router.Submit(new Foo("Hello"));
        
        // Assert
        Assert.AreEqual(2, log.Count);
        Assert.AreEqual("SINK CALLED", log[0]);
        Assert.AreEqual("DISPATCHER CALLED", log[1]);
    }

    [Test]
    public void Router_EmptyList_NoDispatchCalls()
    {
        // Arrange
        CommandSink sink = new CommandSink();

        List<IDomainEvent> sharedEvents = new List<IDomainEvent>(0);
        
        IReadOnlyList<IDomainEvent> LogSink(IGameCommand command)
        {
            return sharedEvents;
        }
        
        sink.Register<Foo>(LogSink);
        EventDispatcher dispatcher = new EventDispatcher();
        CommandRouter router = new CommandRouter(sink, dispatcher);
        
        int foo = 0;
        using IDisposable subscriber = dispatcher.Subscribe<FooBar>(_ => foo++);
        
        // Act
        IReadOnlyList<IDomainEvent> events = router.Submit(new Foo("Hello"));
        
        // Assert: No events were dispatched
        Assert.AreEqual(0, foo);
        Assert.AreSame(events, sharedEvents);
    }
    
    [Test]
    public void Router_NullHandler_NoDispatchCalls()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        
        IReadOnlyList<IDomainEvent> LogSink(IGameCommand command)
        {
            return new List<IDomainEvent>(3)
            {
                new FooBar("First Message"),
                new FooBar("Second Message"),
                new FooBar("Third Message"),
            };
        }
        
        sink.Register<Foo>(LogSink);
        
        EventDispatcher dispatcher = new EventDispatcher();
        CommandRouter router = new CommandRouter(sink, dispatcher);
        
        int foo = 0;
        using IDisposable subscriber = dispatcher.Subscribe<FooBar>(_ => foo++);
        
        // Act
        IReadOnlyList<IDomainEvent> events = router.Submit(null);
        
        // Assert: No events were dispatched
        Assert.AreEqual(0, foo);
        Assert.AreEqual(0, events.Count);
    }

    [Test]
    public void Router_SinkException_NoDispatchCalls()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        sink.Register(new ThrowHandler());
        
        EventDispatcher dispatcher = new EventDispatcher();
        CommandRouter router = new CommandRouter(sink, dispatcher);
        
        int foo = 0;
        using IDisposable subscriber = dispatcher.Subscribe<FooBar>(_ => foo++);
        
        // Act
        InvalidOperationException ex = Assert.Throws<InvalidOperationException>(() => router.Submit(new Foo("x")));
        
        // Assert
        Assert.AreEqual("boom", ex.Message);
        Assert.AreEqual(0, foo);
    }

    [Test]
    public void Router_PreservesEventOrder()
    {
        // Arrange
        CommandSink sink = new CommandSink();

        IReadOnlyList<IDomainEvent> VariedResults(IGameCommand command)
        {
            return new List<IDomainEvent>(3)
            {
                new FooBar(((Foo)command).Message),
                new BarFoo(10),
                new Empty()
            };
        }
        
        sink.Register<Foo>(VariedResults);
        
        EventDispatcher dispatcher = new EventDispatcher();
        CommandRouter router = new CommandRouter(sink, dispatcher);

        List<string> dispatchLog = new List<string>();
        using IDisposable fooBarSub = dispatcher.Subscribe<FooBar>(fooBar => dispatchLog.Add(fooBar.Message));
        using IDisposable barFooSub = dispatcher.Subscribe<BarFoo>(barFoo => dispatchLog.Add(barFoo.Amount.ToString()));
        using IDisposable emptySub = dispatcher.Subscribe<Empty>(_ => dispatchLog.Add("Empty"));
        
        // Act
        IReadOnlyList<IDomainEvent> events = router.Submit(new Foo("Ten"));
        
        // Assert
        Assert.AreEqual(3, dispatchLog.Count);
        Assert.AreEqual("Ten", dispatchLog[0]);
        Assert.AreEqual("10", dispatchLog[1]);
        Assert.AreEqual("Empty", dispatchLog[2]);
    }

    [Test]
    public void Router_MultipleCalls_IndependentData()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        IReadOnlyList<IDomainEvent> LogSink(Foo command)
        {
            return new List<IDomainEvent>(1)
            {
                new FooBar(command.Message),
            };
        }
        sink.Register<Foo>(LogSink);
        
        EventDispatcher dispatcher = new EventDispatcher();
        CommandRouter router = new CommandRouter(sink, dispatcher);
        
        int foo = 0;
        using IDisposable subscriber = dispatcher.Subscribe<FooBar>(_ => foo++);
        
        // Act
        IReadOnlyList<IDomainEvent> firstCall = router.Submit(new Foo("Hello"));
        IReadOnlyList<IDomainEvent> secondCall = router.Submit(new Foo("Hello Again"));
        
        // Assert
        Assert.AreEqual(2, foo);
        Assert.AreNotSame(firstCall, secondCall);
    }

    [Test]
    public void Router_ReEntry_Safe()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        int sinkCalls = 0;
        sink.Register<Foo>(_ =>
        {
            sinkCalls++;
            return new IDomainEvent[] { new FooBar("Message") };
        });
        
        ReentrantSpyDispatcher spy = new ReentrantSpyDispatcher();
        CommandRouter router = new CommandRouter(sink, spy);
        spy.AttachRouter(router);

        // Act
        Assert.DoesNotThrow(() => router.Submit(new Foo("Outer Submit")));

        // Assert
        Assert.AreEqual(2, sinkCalls, "Sink should be called once per submit (outer + nested).");
        Assert.AreEqual(2, spy.DispatchCalls, "Dispatcher should be called once per submit (outer + nested).");
        Assert.IsTrue(spy.DidReenter, "Spy should have performed a nested Submit during Dispatch.");
    }
}