using SanctumProtocol.Core.Data.Enums;
using SanctumProtocol.Stack;

namespace SanctumProtocol.Core;

public class PlayContext
{
	public BattleState State { get; set; }
	public ProtocolStack Stack { get; set; }
	public OwnerType NowOwner { get; set; }
}
