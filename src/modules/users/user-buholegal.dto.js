const UserBuhoLegalDto = (user) => ({
    cedula: user["Cédula"],
    fullName: user["Nombre y Apellidos"],
    career: user["Carrera"],
    university: user["Universidad"],
    state: user["Estado"],
    graduationYear: user["Año"],
});

module.exports = { UserBuhoLegalDto };

