import subprocess
import sys

def install(package):
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        print(f"{package} instalado correctamente.")
    except subprocess.CalledProcessError as e:
        print(f"Error al instalar {package}: {e}")

def list_installed_packages():
    result = subprocess.run([sys.executable, "-m", "pip", "list"], capture_output=True, text=True)
    return result.stdout

# Lista de dependencias necesarias
dependencies = ["requests", "sensecam-control"]

# Mostrar las dependencias instaladas
print("Dependencias instaladas:")
installed_packages = list_installed_packages()
print(installed_packages)

# Intentar instalar las dependencias necesarias
for package in dependencies:
    try:
        __import__(package)
    except ImportError:
        print(f"Instalando {package}...")
        install(package)
