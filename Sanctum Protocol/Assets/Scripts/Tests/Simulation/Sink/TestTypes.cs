using System;
using System.Collections.Generic;
using SanctumProtocol.Simulation.Abstractions.Contracts;

namespace SanctumProtocol.Tests.Simulation.Sink;

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

public sealed class DerivedFoo : Foo
{
    public DerivedFoo(string message) : base(message) { }
}

public sealed class Unknown : IGameCommand { }

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

public sealed class FooHandler : ICommandHandler<Foo>
{
    public IReadOnlyList<IDomainEvent> Handle(Foo command) => new IDomainEvent[] { new FooBar(command.Message) };
}

public sealed class BarHandler : ICommandHandler<Bar>
{
    public IReadOnlyList<IDomainEvent> Handle(Bar command) => new IDomainEvent[] { new BarFoo(command.Amount) };
}

public sealed class ThrowingHandler : ICommandHandler<Foo>
{
    public IReadOnlyList<IDomainEvent> Handle(Foo c) => throw new InvalidOperationException("boom");
}

public interface IFoo : IGameCommand
{
    public string Message { get; set; }
}

public sealed class FooTwo : IFoo
{
    public string Message { get; set; }
    public FooTwo(string message) => Message = message;
}

public sealed class FooTwoHandler : ICommandHandler<IFoo>
{
    public IReadOnlyList<IDomainEvent> Handle(IFoo command) => new IDomainEvent[] { new FooBar(command.Message) };
}
