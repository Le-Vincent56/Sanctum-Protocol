namespace SanctumProtocol.Core.Data.Structs;

public readonly record struct Block
{
	public readonly int Value { private get; init; }

	public Block (int Value) => this.Value = Value;
}
