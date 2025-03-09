from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import io
import matplotlib.pyplot as plt
import base64

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///creditos.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Credito(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(100), nullable=False)
    monto = db.Column(db.Float, nullable=False)
    tasa_interes = db.Column(db.Float, nullable=False)
    plazo = db.Column(db.Integer, nullable=False)
    fecha_otorgamiento = db.Column(db.String(10), nullable=False, default=datetime.utcnow().strftime('%Y-%m-%d'))

@app.route('/creditos', methods=['POST'])
def crear_credito():
    data = request.get_json()
    nuevo_credito = Credito(
        cliente=data['cliente'],
        monto=data['monto'],
        tasa_interes=data['tasa_interes'],
        plazo=data['plazo'],
        fecha_otorgamiento=data.get('fecha_otorgamiento', datetime.utcnow().strftime('%Y-%m-%d'))
    )
    db.session.add(nuevo_credito)
    db.session.commit()
    return jsonify({'mensaje': 'Crédito registrado con éxito'}), 201

@app.route('/creditos', methods=['GET'])
def listar_creditos():
    creditos = Credito.query.all()
    return jsonify([{
        'id': c.id,
        'cliente': c.cliente,
        'monto': c.monto,
        'tasa_interes': c.tasa_interes,
        'plazo': c.plazo,
        'fecha_otorgamiento': c.fecha_otorgamiento
    } for c in creditos])

@app.route('/creditos/<int:id>', methods=['GET'])
def obtener_credito(id):
    credito = Credito.query.get(id)
    if not credito:
        return jsonify({'error': 'Crédito no encontrado'}), 404
    return jsonify({
        'id': credito.id,
        'cliente': credito.cliente,
        'monto': credito.monto,
        'tasa_interes': credito.tasa_interes,
        'plazo': credito.plazo,
        'fecha_otorgamiento': credito.fecha_otorgamiento
    })

@app.route('/creditos/<int:id>', methods=['PUT'])
def editar_credito(id):
    data = request.get_json()
    credito = Credito.query.get(id)
    if not credito:
        return jsonify({'error': 'Crédito no encontrado'}), 404
    
    credito.cliente = data.get('cliente', credito.cliente)
    credito.monto = data.get('monto', credito.monto)
    credito.tasa_interes = data.get('tasa_interes', credito.tasa_interes)
    credito.plazo = data.get('plazo', credito.plazo)
    credito.fecha_otorgamiento = data.get('fecha_otorgamiento', credito.fecha_otorgamiento)
    
    db.session.commit()
    return jsonify({'mensaje': 'Crédito actualizado con éxito'})

@app.route('/creditos/<int:id>', methods=['DELETE'])
def eliminar_credito(id):
    credito = Credito.query.get(id)
    if not credito:
        return jsonify({'error': 'Crédito no encontrado'}), 404
    
    db.session.delete(credito)
    db.session.commit()
    return jsonify({'mensaje': 'Crédito eliminado con éxito'})

@app.route('/grafico/creditos', methods=['GET'])
def grafico_creditos():
    # Obtener todos los créditos de la base de datos
    creditos = Credito.query.all()

    # Datos para la gráfica: nombres de clientes y montos
    clientes = [credito.cliente for credito in creditos]
    montos = [credito.monto for credito in creditos]

    # Crear el gráfico
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.bar(clientes, montos, color='skyblue')
    ax.set_xlabel('Clientes')
    ax.set_ylabel('Monto otorgado')
    ax.set_title('Monto de Créditos Otorgados por Cliente')

    # Mejorar la visualización del gráfico
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()

    # Guardar la imagen en un objeto en memoria
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)

    # Codificar la imagen en base64 para enviarla como respuesta
    img_b64 = base64.b64encode(img.getvalue()).decode('utf-8')

    return jsonify({"grafico": img_b64})
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
