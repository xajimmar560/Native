import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Página Principal</Text>
      <Text variant="bodyLarge" style={styles.subtitle}>Gestión de Mazos</Text>
      <Button mode="contained" onPress={() => router.push('/listado')}>
        Ver Listado
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  subtitle: { marginBottom: 20, color: 'gray' }
});