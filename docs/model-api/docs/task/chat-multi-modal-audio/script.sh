curl -X POST 'https://api.bytez.com/models/v2/Qwen/Qwen2-Audio-7B-Instruct' \
-H 'Authorization: Key BYTEZ_KEY' \
-H 'Content-Type: application/json' \
--data '{
    "messages": [
      {
        "role": "user",
        "content": [
          { "type": "text": "text": "Describe this audio" },
          { "type": "audio", "url": "https://dn720307.ca.archive.org/0/items/various-bird-sounds/Various%20Bird%20Sounds.mp3" }
        ]
      }
    ],
    "stream": true
  }'