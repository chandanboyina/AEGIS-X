from agents.soar.plugins.plugin_base import PluginBase


class DefenderPlugin(PluginBase):

    name = "Microsoft Defender"

    def execute(
        self,
        action
    ):

        return {

            "plugin": self.name,

            "status": "SUCCESS",

            "message":

                f"Endpoint {action['target']} isolated.",

            "action": action

        }