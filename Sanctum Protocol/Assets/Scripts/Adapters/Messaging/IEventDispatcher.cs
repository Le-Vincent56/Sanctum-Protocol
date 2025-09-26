using System;
using System.Collections.Generic;
using SanctumProtocol.Simulation.Abstractions.Contracts;

namespace SanctumProtocol.Adapters.Messaging;

public interface IEventDispatcher
{
    void Dispatch(IReadOnlyList<IDomainEvent> events);
    IDisposable Subscribe<T>(Action<T> handler) where T : IDomainEvent;
}