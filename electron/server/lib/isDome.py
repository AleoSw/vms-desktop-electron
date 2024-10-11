import requests
from requests.auth import HTTPDigestAuth
import sys

def get_camera_data(ip_camera, username, password):
    url = f"http://{ip_camera}/axis-cgi/param.cgi?action=list&group=root.Brand.ProdType"
    response = requests.get(url, auth=HTTPDigestAuth(username, password))

    if response.status_code == 200:
        return response.text  # Devuelve los parámetros como texto
    else:
        return f"Error al acceder a la cámara: {response.status_code}"

if __name__ == "__main__":
    # Configura las credenciales y la IP de la cámara
    ip_camara = sys.argv[1]  # IP de la cámara
    usuario = sys.argv[2]     # Usuario
    contraseña = sys.argv[3]  # Contraseña
    result = get_camera_data(ip_camara, usuario, contraseña)
    print(result)

