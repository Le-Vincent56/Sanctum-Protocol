using System;

namespace SanctumProtocol.Core;

// Will add more functionality to these later

public readonly record struct Health
{
	public readonly int Value { private get; init; }

	public Health (int Value) => this.Value = Value;
}

public readonly record struct Memory
{
	public readonly int Value { private get; init; }

	public Memory (int Value) => this.Value = Value;
}

public readonly record struct Block
{
	public readonly int Value { private get; init; }

	public Block (int Value) => this.Value = Value;
}

public readonly record struct ProtocolValue
{
	public readonly int Value { private get; init; }

	public ProtocolValue (int Value) => this.Value = Value;
}

public readonly record struct CardID
{
	public readonly Guid Value { private get; init; }

	public CardID (Guid Value) => this.Value = Value;
}