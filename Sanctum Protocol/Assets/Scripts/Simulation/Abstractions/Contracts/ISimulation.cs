using System.Collections.Generic;

namespace SanctumProtocol.Simulation.Abstractions.Contracts;

public interface ISimulation
{
        IReadOnlyList<IDomainEvent> Execute(IGameCommand command);
}