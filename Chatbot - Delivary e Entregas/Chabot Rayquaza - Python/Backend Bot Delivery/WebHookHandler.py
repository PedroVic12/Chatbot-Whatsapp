from heyoo import WhatsApp
from fastapi import FastAPI
import uvicorn
import logging


class WebhookHandler:
    def __init__(self, token: str, phone_id: str):
        self.client = WhatsApp(token, phone_id)

    def handle_webhook(self, data):
        logging.info("Received webhook data: %s", data)
        changed_field = self.client.changed_field(data)
        if changed_field == "messages":
            new_message = self.client.get_mobile(data)
            if new_message:
                mobile = self.client.get_mobile(data)
                name = self.client.get_name(data)
                message_type = self.client.get_message_type(data)
                logging.info(
                    f"New Message; sender:{mobile} name:{name} type:{message_type}"
                )
                if message_type == "text":
                    message = self.client.get_message(data)
                    name = self.client.get_name(data)
                    logging.info("Message: %s", message)
                    self.client.send_message(
                        f"Hi {name}, nice to connect with you", mobile)

                elif message_type == "interactive":
                    message_response = self.client.get_interactive_response(
                        data)
                    interactive_type = message_response.get("type")
                    message_id = message_response[interactive_type]["id"]
                    message_text = message_response[interactive_type]["title"]
                    logging.info(
                        f"Interactive Message; {message_id}: {message_text}")

                elif message_type == "location":
                    message_location = self.client.get_location(data)
                    message_latitude = message_location["latitude"]
                    message_longitude = message_location["longitude"]
                    logging.info("Location: %s, %s",
                                 message_latitude, message_longitude)

                elif message_type == "image":
                    image = self.client.get_image(data)
                    image_id, mime_type = image["id"], image["mime_type"]
                    image_url = self.client.query_media_url(image_id)
                    image_filename = self.client.download_media(
                        image_url, mime_type)
                    print(f"{mobile} sent image {image_filename}")
                    logging.info(f"{mobile} sent image {image_filename}")

                elif message_type == "video":
                    video = self.client.get_video(data)
                    video_id, mime_type = video["id"], video["mime_type"]
                    video_url = self.client.query_media_url(video_id)
                    video_filename = self.client.download_media(
                        video_url, mime_type)
                    print(f"{mobile} sent video {video_filename}")
                    logging.info(f"{mobile} sent video {video_filename}")

                elif message_type == "audio":
                    audio = self.client.get_audio(data)
                    audio_id, mime_type = audio["id"], audio["mime_type"]
                    audio_url = self.client.query_media_url(audio_id)
                    audio_filename = self.client.download_media(
                        audio_url, mime_type)
                    print(f"{mobile} sent audio {audio_filename}")
                    logging.info(f"{mobile} sent audio {audio_filename}")

                elif message_type == "document":
                    file = self.client.get_document(data)
                    file_id, mime_type = file["id"], file["mime_type"]
                    file_url = self.client.query_media_url(file_id)
                    file_filename = self.client.download_media(
                        file_url, mime_type)
                    print(f"{mobile} sent file {file_filename}")
                    logging.info(f"{mobile} sent file {file_filename}")
                else:
                    print(f"{mobile} sent {message_type} ")
                    print(data)
            else:
                delivery = self.client.get_delivery(data)
            if delivery:
                print(f"Message : {delivery}")
            else:
                print("No new message")
        return "ok"
