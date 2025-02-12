const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
  
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          documento,
          email,
          password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Error al registrar usuario");
        return;
      }
  
      const data = await response.json();
      console.log("Usuario registrado exitosamente:", data);
  
      // Guardar el token (en localStorage o cookie segura)
      localStorage.setItem("token", data.token);
  
      // Redirigir o mostrar mensaje de éxito
    } catch (error) {
      console.error("Error durante el registro:", error);
      setErrorMessage("Ocurrió un error. Por favor, inténtalo de nuevo.");
    }
  };
  