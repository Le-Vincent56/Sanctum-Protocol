
using SanctumProtocol.Core.Data.Structs;
using SanctumProtocol.Core.Data.Enums;
using SanctumProtocol.Core;

namespace SanctumProtocol.Cards;

public abstract class Card
{
	public CardID CardID { get; set; }
	public Memory Cost { get; set; }
	public OwnerType Owner { get; set; }

	public Result Play (PlayContext ctx)
	{
		return new Result(0);
	}

	private Result ValidatePlay (PlayContext ctx)
	{
		return new Result(0);
	}
}