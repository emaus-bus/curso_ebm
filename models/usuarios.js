const usuarios Queries = {
    inserUsuario: `
        INSER INTO
            usuarios(
                nombre,
                email,
                password,
                status
            )
        VALUES
            (?,?,?,?)
    `,
    selectUsuarios: `
        SELECT
            *
        FROM
            usuarios
        WHERE
            status = 1
    `,
}