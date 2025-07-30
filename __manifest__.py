{
    "name": "Hello Dashboard",
    "version": "1.0",
    "depends": ["web"],
    "category": "Tools",
    "summary": "A simple dashboard showing Hello World",
    "data": [
        "views/hello_dashboard_templates.xml",
        "views/hello_dashboard_menu.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "hello_dashboard/static/src/js/hello_dashboard.js",
            "hello_dashboard/static/src/xml/hello_dashboard.xml",
        ],
    },
    "installable": True,
    "application": True,
}