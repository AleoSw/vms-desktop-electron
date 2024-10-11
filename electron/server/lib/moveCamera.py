import sys
from sensecam_control import vapix_control

# Configuración de la cámara
camera = None

def initialize_camera(ip, user, password):
    global camera
    camera = vapix_control.CameraControl(ip, user, password)

def continuous_move(direction):
    """Inicia el movimiento continuo en la dirección especificada."""
    if direction == 'left':
        print("Iniciando movimiento continuo hacia la izquierda.")
        camera.continuous_move(-30, 0, 0)  # Movimiento de pan a la izquierda
    elif direction == 'right':
        print("Iniciando movimiento continuo hacia la derecha.")
        camera.continuous_move(30, 0, 0)  # Movimiento de pan a la derecha
    elif direction == 'up':
        print("Iniciando movimiento continuo hacia arriba.")
        camera.continuous_move(0, 30, 0)  # Movimiento de tilt hacia arriba
    elif direction == 'down':
        print("Iniciando movimiento continuo hacia abajo.")
        camera.continuous_move(0, -30, 0)  # Movimiento de tilt hacia abajo
    else:
        print("Dirección no válida. Usa 'left', 'right', 'up' o 'down'.")

def stop_move():
    """Detiene el movimiento de la cámara."""
    print("Deteniendo movimiento.")
    camera.stop_move()

if __name__ == '__main__':
    if len(sys.argv) != 5:
        print("Uso: python moveCamera.py <ip> <user> <password> <direction>")
        sys.exit(1)

    ip = sys.argv[1]
    user = sys.argv[2]
    password = sys.argv[3]
    direction = sys.argv[4]

    initialize_camera(ip, user, password)

    if direction == 'stop':
        stop_move()
    else:
        continuous_move(direction)
