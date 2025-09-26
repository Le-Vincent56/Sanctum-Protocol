using SanctumProtocol.Core.Data.Enums;
using SanctumProtocol.Core.Data.Structs;

namespace SanctumProtocol.Stack;

public class Protocol
{
	public ProtocolType Type { get; set; }
	public OwnerType Owner { get; set; }
	public ProtocolValue Value { get; set; }

}