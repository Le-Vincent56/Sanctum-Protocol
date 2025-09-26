using System.Collections.Generic;

namespace SanctumProtocol.Simulation.Abstractions.Contracts;

public interface  IGameCommandSink
{
    IReadOnlyList<IDomainEvent> Handle(IGameCommand command);
}