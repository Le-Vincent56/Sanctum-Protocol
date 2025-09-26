using System;
using System.Collections.Generic;
using SanctumProtocol.Simulation.Abstractions.Contracts;

namespace SanctumProtocol.Simulation.Core;

/// <summary>
/// Central command processing hub that routes game commands to their 
/// appropriate handlers and produces domain events as a result.
/// </summary>

public sealed class CommandSink : IGameCommandSink
{
    private readonly Dictionary<Type, Func<IGameCommand, IReadOnlyList<IDomainEvent>>> _routes =
        new Dictionary<Type, Func<IGameCommand, IReadOnlyList<IDomainEvent>>>(32);

    /// <summary>
    /// Registers a handler for processing commands of a specific type
    /// </summary>
    /// <typeparam name="TCommand">Type of command to handle</typeparam>
    /// <param name="handler">Handler implementation for processing the command</param>
    /// <exception cref="ArgumentNullException">Thrown when the handler is null</exception>
    public void Register<TCommand>(ICommandHandler<TCommand> handler) where TCommand : class, IGameCommand
    {
        if(handler == null) throw new ArgumentNullException(nameof(handler));
        _routes[typeof(TCommand)] = Wrap(handler);
    }
    
    /// <summary>
    /// Registers a simple function as a command handler, useful for testing scenarios
    /// </summary>
    /// <typeparam name="TCommand">Type of command to handle</typeparam>
    /// <param name="handle">Function that processes the command</param>
    /// <exception cref="ArgumentNullException">Thrown when the handle function is null</exception>
    public void Register<TCommand>(Func<TCommand, IReadOnlyList<IDomainEvent>> handle)
        where TCommand : class, IGameCommand
    {
        if (handle == null) throw new ArgumentNullException(nameof(handle));
        _routes[typeof(TCommand)] = Wrap(handle);
    }
    
    /// <summary>
    /// Processes a game command by routing it to its registered handler
    /// </summary>
    /// <param name="command">Command to process</param>
    /// <returns>List of domain events produced by handling the command</returns>
    /// <exception cref="ArgumentException">Thrown when no handler is registered for the command type</exception>
    public IReadOnlyList<IDomainEvent> Handle(IGameCommand command)
    {
        if (command is null) return Array.Empty<IDomainEvent>();

        // Extract the command type
        Type commandType = command.GetType();
        
        // Check if the command already has a routed system
        if (_routes.TryGetValue(commandType, out Func<IGameCommand, IReadOnlyList<IDomainEvent>> invoker))
        {
            // Cast is safe because the route was keyed by the exact command type.
            return invoker(command);
        }

        // Unknown command, throw an exception
        throw new ArgumentException(nameof(command));
    }
    
    /// <summary>
    /// Wraps a typed command handler in a generic command processor function
    /// </summary>
    private static Func<IGameCommand, IReadOnlyList<IDomainEvent>> Wrap<TCommand>(
        ICommandHandler<TCommand> handler) 
        where TCommand : class, IGameCommand
        => command => handler.Handle(command as TCommand);
    
    /// <summary>
    /// Wraps a command handling function in a generic command processor function
    /// </summary>
    private static Func<IGameCommand, IReadOnlyList<IDomainEvent>> Wrap<TCommand>(
        Func<TCommand, IReadOnlyList<IDomainEvent>> handle)
        where TCommand : class, IGameCommand
        => command => handle(command as TCommand);
}