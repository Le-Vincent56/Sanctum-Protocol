namespace SanctumProtocol.Core.Data.Structs;

public readonly record struct Result
{
	public readonly int Value { private get; init; }

	public Result (int Value) => this.Value = Value;
}
