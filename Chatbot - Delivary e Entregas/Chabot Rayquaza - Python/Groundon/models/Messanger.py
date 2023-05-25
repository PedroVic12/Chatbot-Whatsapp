class Messenger:
    @staticmethod
    def changed_field(data):
        return data.get("changed_fields", [])

    @staticmethod
    def get_mobile(data):
        return data.get("sender", {}).get("id")

    @staticmethod
    def get_name(data):
        return data.get("sender", {}).get("name")

    @staticmethod
    def get_message_type(data):
        return data.get("messages", [{}])[0].get("type")

    @staticmethod
    def get_message(data):
        return data.get("messages", [{}])[0].get("text")

    @staticmethod
    def get_interactive_response(data):
        return data.get("messages", [{}])[0].get("interactive")

    @staticmethod
    def get_location(data):
        return data.get("messages", [{}])[0].get("location")

    @staticmethod
    def get_image(data):
        return data.get("messages", [{}])[0].get("image")

    @staticmethod
    def get_video(data):
        return data.get("messages", [{}])[0].get("video")

    @staticmethod
    def get_audio(data):
        return data.get("messages", [{}])[0].get("audio")

    @staticmethod
    def get_document(data):
        return data.get("messages", [{}])[0].get("document")

    @staticmethod
    def get_delivery(data):
        return data.get("deliveries", [{}])[0]

    @staticmethod
    def send_message(message, mobile):
        GROUNDON.send_message(message, mobile)
