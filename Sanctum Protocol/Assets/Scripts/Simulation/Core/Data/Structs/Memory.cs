namespace SanctumProtocol.Core.Data.Structs;

public readonly record struct Memory
{
	public readonly int Value { private get; init; }

	public Memory (int Value) => this.Value = Value;
}
