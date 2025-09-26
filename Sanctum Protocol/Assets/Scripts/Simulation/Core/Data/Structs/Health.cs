namespace SanctumProtocol.Core.Data.Structs;

public readonly record struct Health
{
	public readonly int Value { private get; init; }

	public Health (int Value) => this.Value = Value;
}
