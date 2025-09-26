using System;
using System.Collections.Generic;
using SanctumProtocol.Adapters.Messaging;
using SanctumProtocol.Adapters.Routing;
using SanctumProtocol.Simulation.Abstractions.Contracts;

namespace SanctumProtocol.Tests.Adapters.Routing;

public class Foo : IGameCommand
{
    public string Message;
    public Foo(string message) => Message = message;
}

public sealed class Bar : IGameCommand
{
    public int Amount;
    public Bar(int amount) => Amount = amount;
}

public sealed class FooBar : IDomainEvent
{
    public string Message;
    public FooBar(string message) => Message = message;
}

public sealed class BarFoo : IDomainEvent
{
    public int Amount;
    public BarFoo(int amount) => Amount = amount;
}

public sealed class Empty : IDomainEvent { }

public sealed class FooHandler : ICommandHandler<Foo>
{
    public IReadOnlyList<IDomainEvent> Handle(Foo command) => new IDomainEvent[] { new FooBar(command.Message) };
}

public sealed class BarHandler : ICommandHandler<Bar>
{
    public IReadOnlyList<IDomainEvent> Handle(Bar command) => new IDomainEvent[] { new BarFoo(command.Amount) };
}

public sealed class ThrowHandler : ICommandHandler<Foo>
{
    public IReadOnlyList<IDomainEvent> Handle(Foo command) => throw new InvalidOperationException("boom");
}

public sealed class ReentrantSpyDispatcher : IEventDispatcher
{
    private CommandRouter _router;
    private bool _inDispatch;
    public bool DidReenter { get; private set; }
    public int DispatchCalls { get; private set; }

    public void AttachRouter(CommandRouter router) => _router = router;

    public void Dispatch(IReadOnlyList<IDomainEvent> events)
    {
        DispatchCalls++;

        // Guard against infinite recursion: only re-enter once, and not if already in a nested dispatch.
        if (_inDispatch || DidReenter) return;
        _inDispatch = true;
        DidReenter = true;

        // Re-enter the router while we are inside the first Dispatch call.
        _router.Submit(new Foo("Nested Submit"));

        _inDispatch = false;
    }

    public IDisposable Subscribe<T>(Action<T> handler) where T : IDomainEvent
    {
        // Not needed for this test; return a no-op subscription.
        return new Noop();
    }
    
    private sealed class Noop : IDisposable { public void Dispose() { } }
}
