namespace SanctumProtocol.Core.Data.Structs;

public readonly record struct ProtocolValue
{
	public readonly int Value { private get; init; }

	public ProtocolValue (int Value) => this.Value = Value;
}
