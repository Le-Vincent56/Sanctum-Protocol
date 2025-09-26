using SanctumProtocol.Core.Data.Enums;
using SanctumProtocol.Core.Data.Structs;
using System.Collections.Generic;

namespace SanctumProtocol.Stack;

public class ProtocolStack
{
	public int Count { get; set; }
	public IReadOnlyList<Protocol> Items { get; set; }

	public Result TryPush (Protocol p)
	{
		return new Result(0);
	}

	public int Clear ( )
	{
		return 0;
	}

	public Protocol TopOfType (ProtocolType type, OwnerType owner)
	{
		return null;
	}

	public Protocol BottomOfType (ProtocolType type, OwnerType owner)
	{
		return null;
	}
}
