using System;
using SanctumProtocol.Core;

namespace SanctumProtocol.Cards;

public abstract class Card
{
	public CardID CardID { get; set; }
	public Memory Cost { get; set; }
	// public Owner Owner { get; set; }

	// public Result Play (PlatContext ctx)
	// private Result ValidatePlay (PlatContext ctx)
}