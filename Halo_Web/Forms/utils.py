import os

static_paths={
      "Forms": lambda path,filename: path+f"/Forms/{filename}",
      "Profile": lambda path,filename: path+f"/Profile/{filename}",
      "Others": lambda path,filename: path+f"/Others/{filename}",
}

def buscar_archivo(path, filename):
    for carpeta, ruta_func in static_paths.items():
        # Construir la ruta completa usando la función lambda
        ruta_completa = ruta_func(path, filename)
        
        # Verificar si el archivo existe en esa ruta
        if os.path.exists(ruta_completa):
            print(f"El archivo {filename} se encuentra en la carpeta {carpeta}: {ruta_completa}")
            return ruta_completa