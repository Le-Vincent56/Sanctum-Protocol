using System;
using System.Collections.Generic;
using SanctumProtocol.Simulation.Abstractions.Contracts;

namespace SanctumProtocol.Adapters.Messaging;
    
public sealed class EventDispatcher : IEventDispatcher
{
    private sealed class Subscriber : IDisposable
    {
        private Action _dispose;
        public Subscriber(Action d) => _dispose = d;
        public void Dispose() { _dispose?.Invoke(); _dispose = null; }
    }
    
    private readonly Dictionary<Type, List<Delegate>> _handlers = new();

    public IDisposable Subscribe<T>(Action<T> handler) where T : IDomainEvent
    {
        // Extract the domain event type
        Type eventType = typeof(T);
            
        // Check if the event type has not already been registered
        if(!_handlers.TryGetValue(eventType, out List<Delegate> delegates))
            _handlers[eventType] = delegates = new List<Delegate>(4);
            
        // Add the handler to the delegates
        delegates.Add(handler);
            
        // Create a subscriber using the handler and return it
        return new Subscriber(() => delegates.Remove(handler));
    }

    public void Dispatch(IReadOnlyList<IDomainEvent> events)
    {
        foreach (IDomainEvent @event in events)
        {
            // If the event type is not registered, skip it
            if (!_handlers.TryGetValue(@event.GetType(), out List<Delegate> delegates)) continue;
                
            // Iterate on a copy so handlers can unsubscribe during dispatch
            Delegate[] copy = delegates.ToArray();
            foreach (Delegate @delegate in copy)
            {
                @delegate.DynamicInvoke(@event);
            }
        }
    }
}