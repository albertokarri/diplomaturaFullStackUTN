var pool = require('./bd'); // lamando a la base de datos

async function getNovedades(user) {
    try {
        var query;
        var rows;
        if (user == 'admin') {
            query = 'select * from novedades where activo = true order by id desc';
            rows = await pool.query(query);
        } else {
            query = 'select * from novedades where activo = true and usuario = ? order by id desc';
            rows = await pool.query(query, [user]);
        }
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getNovedadByID(id) {
    try {
        var query = 'select * from novedades where id = ?'
        var rows = await pool.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getNovedadesDeleted(user) {
    try {
        var query;
        var rows;
        if (user == 'admin') {
            query = 'select * from novedades where activo = false order by id desc';
            rows = await pool.query(query);
        } else {
            query = 'select * from novedades where activo = false and usuario = ? order by id desc';
            rows = await pool.query(query, [user]);
        }
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getNovedadesFrontEnd() {
    try {
        var query;
        var rows;
        query = 'select * from novedades where activo = true and visible = true order by fecha desc';
        rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function insertNovedad(novedad) {
    try {
        var query = 'insert into novedades set ?';
        var rows = await pool.query(query, [novedad]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function modifyNovedadById(campos, id) {
    try {
        var query = 'update novedades set ? where id = ?';
        var rows = await pool.query(query, [campos, id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function hideNovedadById(id) {
    try {
        var query = 'update novedades set visible = false where id = ?';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function unhideNovedadById(id) {
    try {
        var query = 'update novedades set visible = true where id = ?';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteNovedadById(id) {
    try {
        var query = 'update novedades set activo = false where id = ?';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function undoDeleteNovedadById(id) {
    try {
        var query = 'update novedades set activo = true where id = ?';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deletePermanentlyNovedadById(id) {
    try {
        var query = 'delete from novedades where id = ?';
        var rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    } 
}

module.exports = { getNovedades, getNovedadByID, getNovedadesDeleted, getNovedadesFrontEnd, insertNovedad, modifyNovedadById, hideNovedadById, unhideNovedadById, deleteNovedadById, deletePermanentlyNovedadById, undoDeleteNovedadById }