using SanctumProtocol.Simulation.Abstractions.Contracts;
using System.Collections.Generic;

namespace SanctumProtocol.Adapters.Routing;

public interface IGameCommandRouter
{
    IReadOnlyList<IDomainEvent> Submit(IGameCommand command);
}