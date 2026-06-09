import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, IconButton, Text } from 'react-native-paper';

interface MazoProps {
  id_mazo: number;
  nombre_mazo: string;
  fecha_creacion: string;
  id_usuario: number;
  onDelete: (id: number) => void;
}

export function MazoCard({ id_mazo, nombre_mazo, fecha_creacion, id_usuario, onDelete }: MazoProps) {
  return (
    <Card style={styles.card} mode="elevated">
      {/* Cabecera con Avatar e Icono de Borrado */}
      <Card.Title
        title={nombre_mazo}
        titleVariant="titleLarge"
        subtitle="Mazo"
        left={(props) => (
            fecha_creacion
        )}
        right={(props) => (
          <IconButton 
            {...props} 
            icon="delete-outline" 
            iconColor="#B00020" 
            onPress={() => onDelete(id_mazo)} 
          />
        )}
      />

      <Card.Content style={styles.content}>
        <Text variant="bodyMedium" numberOfLines={3} style={styles.bio}>
          {id_usuario || "Sin id de usuario propietario"}
        </Text>
      </Card.Content>

      {/* Acciones adicionales (Opcional: Ver detalle o Editar) */}
      <Card.Actions>
        <Button mode="text" onPress={() => console.log('Ver más no hace nada', id_mazo)}>
          Ver más
        </Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 8,
  },
  bio: {
    color: '#444',
    lineHeight: 20,
  }
});