using System;

namespace SanctumProtocol.Core.Data.Structs;

public readonly record struct CardID
{
	public readonly Guid Value { private get; init; }

	public CardID (Guid Value) => this.Value = Value;
}