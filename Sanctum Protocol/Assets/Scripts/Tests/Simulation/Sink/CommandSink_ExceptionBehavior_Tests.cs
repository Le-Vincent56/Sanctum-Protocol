using System;
using NUnit.Framework;
using SanctumProtocol.Simulation.Core;

namespace SanctumProtocol.Tests.Simulation.Sink;

public sealed class CommandSinkExceptionBehaviorTests
{
    [Test]
    public void Handle_UnknownCommandType_ThrowsArgumentException()
    {
        // Arrange
        CommandSink sink = new CommandSink();
        var ex = Assert.Throws<ArgumentException>(() => sink.Handle(new Unknown()));
    }
}