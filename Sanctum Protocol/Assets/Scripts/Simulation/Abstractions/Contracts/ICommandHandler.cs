using System.Collections.Generic;

namespace SanctumProtocol.Simulation.Abstractions.Contracts;

public interface ICommandHandler<TCommand> where TCommand : IGameCommand
{
    IReadOnlyList<IDomainEvent> Handle(TCommand command);
}