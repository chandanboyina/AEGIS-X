from agents.soar.plugin_manager import PluginManager


class Executor:

    def __init__(self):

        self.plugins = PluginManager()

    def execute(
        self,
        workflow
    ):

        results = []

        for action in workflow:

            plugin = self.plugins.get_plugin(

                action["integration"]

            )

            result = plugin.execute(
                action
            )

            results.append(result)

        return results