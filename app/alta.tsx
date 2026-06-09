import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Text, TextInput } from 'react-native-paper';
import api from '../src/services/api';

export default function AltaMazo() {
  const [form, setForm] = useState({
    nombre_mazo: '',
    fecha_creacion: '',
    favorito: false,
    id_usuario: ''
  });

  const [usuarios, setUsuarios] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const respuesta = await api.get("/usuarios/");
        setUsuarios(respuesta.datos || []);
        setErr(null);
      } catch (error: any) {
        setErr(error.mensaje || "No se pudo conectar al servidor");
        setUsuarios([]);
      }
    }

    fetchUsuarios();
  }, []);

  const showAlert = (title: string, message?: string) => {
    if (Platform.OS === 'web') {
      window.alert(title + (message ? '\n\n' + message : ''));
    } else {
      Alert.alert(title, message);
    }
  };

  const handleSave = async () => {
    console.log('[AltaMazo] handleSave called — form:', form);
    
    if (!form.nombre_mazo || !form.fecha_creacion || !form.id_usuario) {
      showAlert('Error', 'Por favor, rellena al menos el nombre, el usuario y la fecha.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/mazos', form);
      showAlert('Éxito', 'Mazo guardado correctamente');
      setForm({ nombre_mazo: '', fecha_creacion: '', favorito: false, id_usuario: '' });
    } catch (error: any) {
      console.error('[AltaMazo] save error:', error);
      showAlert('Error', error?.mensaje || 'No se pudo guardar el mazo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineSmall" style={styles.title}>Nuevo Mazo</Text>
      
      <TextInput
        label="Nombre del mazo"
        value={form.nombre_mazo}
        onChangeText={(text) => setForm({ ...form, nombre_mazo: text })}
        mode="outlined"
        style={styles.input}
        placeholder="Ej: Avalancha"
      />

      <TextInput
        label="Fecha de Creación (AAAA-MM-DD)"
        value={form.fecha_creacion}
        onChangeText={(text) => setForm({ ...form, fecha_creacion: text })}
        mode="outlined"
        style={styles.input}
        placeholder="1880-12-12"
      />

      <View style={styles.checkboxContainer}>
        <Checkbox
          value={form.favorito}
          onValueChange={(value) => setForm({ ...form, favorito: value })}
          color={form.favorito ? '#f8db01' : undefined}
        />
        <Text style={styles.checkboxLabel}>Favorito</Text>
      </View>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={usuarios}
        labelField="nombre_usuario"  
        valueField="id"  
        placeholder="Selecciona usuario..."
        value={form.id_usuario}
        onChange={item => {
          setForm({ ...form, id_usuario: item.id }); 
        }}
      />

      <Button 
        mode="contained" 
        onPress={handleSave} 
        loading={loading}
        disabled={loading}
        icon="content-save"
        style={styles.button}
      >
        Guardar mazo
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 20, 
    paddingVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
  },
});
