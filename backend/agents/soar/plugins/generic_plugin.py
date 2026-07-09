from agents.soar.plugins.plugin_base import PluginBase


class GenericPlugin(PluginBase):

    name = "Generic"

    def execute(
        self,
        action
    ):

        return {

            "plugin": self.name,

            "status": "SUCCESS",

            "action": action

        }