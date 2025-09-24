using System;
using NUnit.Framework;
using SanctumProtocol.Simulation.Core;

namespace SanctumProtocol.Tests.Adapters.Plumbing;

public sealed class CommandSinkExceptionBehavior_Tests
{
    [Test]
    public void Handle_UnknownCommandType_ThrowsArgumentException()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        var ex = Assert.Throws<ArgumentException>(() => sink.Handle(new Unknown()));
    }
}