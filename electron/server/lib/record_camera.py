# record_camera.py

import os
import subprocess
import time
from datetime import datetime
import sys

def record(ip, user, password):
    url = f"http://localhost:5002/axis/camera-stream?ip={ip}&user={user}&password={password}"
    homedir = os.path.expanduser("~")
    output_dir = os.path.join(homedir, "Videos", "vms", ip) if os.name == "nt" else os.path.join(homedir, "videos", "vms", "records", ip)

    os.makedirs(output_dir, exist_ok=True)

    segment_duration = 60  # Duración del segmento en segundos

    while True:
        timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        output_path = os.path.join(output_dir, f"{ip}_{timestamp}.mp4")

        ffmpeg_cmd = [
            "ffmpeg",
            "-i", url,
            "-t", str(segment_duration),
            "-c:v", "libx264",
            "-preset", "ultrafast",
            "-f", "mp4",
            output_path
        ]

        process = subprocess.Popen(ffmpeg_cmd, stderr=subprocess.PIPE)

        for line in process.stderr:
            print(line.decode(), end="")

        process.wait()

        if process.returncode == 0:
            print(f"Grabación finalizada: {output_path}")
        else:
            print(f"Error al grabar el stream: ffmpeg exited with code {process.returncode}")

        time.sleep(segment_duration + 1)


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Uso: python record_camera.py <ip> <user> <password>")
        sys.exit(1)

    # Obtener los parámetros desde la línea de comandos
    ip = sys.argv[1]
    user = sys.argv[2]
    password = sys.argv[3]

    # Llamar a la función para iniciar la grabación
    try:
        record(ip, user, password)
    except KeyboardInterrupt:
        print("Grabación detenida por el usuario.")
