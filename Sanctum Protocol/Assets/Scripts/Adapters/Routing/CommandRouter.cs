using System.Collections.Generic;
using SanctumProtocol.Adapters.Messaging;
using SanctumProtocol.Simulation.Abstractions.Contracts;

namespace SanctumProtocol.Adapters.Routing;

/// <summary>
/// Converts Presentation interactions into Domain commands, forwarding them
/// to the Command Sink
/// </summary>
public sealed class CommandRouter : IGameCommandRouter
{
    private readonly IGameCommandSink _sink;
    private readonly IEventDispatcher _dispatcher;

    public CommandRouter(IGameCommandSink sink, IEventDispatcher dispatcher)
    {
        _sink = sink;
        _dispatcher = dispatcher;
    }

    public IReadOnlyList<IDomainEvent> Submit(IGameCommand command)
    {
        IReadOnlyList<IDomainEvent> events = _sink.Handle(command);
        _dispatcher.Dispatch(events);
        return events;
    }
}