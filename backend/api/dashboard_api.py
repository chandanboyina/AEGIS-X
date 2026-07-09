from flask import Blueprint, jsonify

from services.dashboard_service import DashboardService

dashboard = Blueprint(
    "dashboard",
    __name__
)

service = DashboardService()


@dashboard.route("/dashboard")

def latest():

    packet = service.latest_packet()

    return jsonify(packet)

@dashboard.route("/dashboard/summary")

def summary():

    packet = service.latest_packet()

    return jsonify({

        "incident":
            packet["incident"]["incident_id"],

        "category":
            packet["oracle"]["category"],

        "playbook":
            packet["commander"]["recommended_playbook"],

        "pipeline":
            packet["pipeline"],

        "trace":
            packet["trace"]

    })

@dashboard.route("/dashboard/council")

def council():

    packet = service.latest_packet()

    return jsonify(

        packet["incident"]["council"]

    )

@dashboard.route("/dashboard/twin")

def twin():

    packet = service.latest_packet()

    return jsonify(

        packet["digital_twin"]

    )

@dashboard.route("/dashboard/brain")

def brain():

    packet = service.latest_packet()

    return jsonify(

        packet["brain"]

    )

@dashboard.route("/dashboard/dna")

def dna():

    packet = service.latest_packet()

    return jsonify(

        packet["cyber_dna"]

    )

@dashboard.route("/dashboard/pipeline")

def pipeline():

    packet = service.latest_packet()

    return jsonify(

        packet["pipeline"]

    )

@dashboard.route("/dashboard/trace")

def trace():

    packet = service.latest_packet()

    return jsonify(

        packet["trace"]

    )