import React from 'react';
import { ScrollView, View, StyleSheet} from 'react-native';
import { Text, Button, Card, ActivityIndicator } from 'react-native-paper';

export default function HomeScreen({ navigation }) {

const [medications, setMedications] = React.useState([]);
const [loading, setLoading] = React.useState(false);
const [error, setError] = React.useState('');

const MEDICATIONS_URL = 'https://rainfantry.github.io/sigmamedex-data/medications.json';

const loadMedications = async () => {
    try{
        setLoading(true);
        setError('');
        const response = await fetch(MEDICATIONS_URL);
        if(!response.ok){
            throw new Error('Network response failed.')
        }
        const text = await response.text();
        const cleaned = text.replace(/^﻿/, '');
        const data = JSON.parse(cleaned);
        setMedications(data.medications);
    }
    catch (e){
        setError('Could not load medications. Check network connection.');
        console.error(e);
    }
    finally {
        setLoading(false);
    }
}

React.useEffect(() => {
    loadMedications();
}, []);

    return (
        <ScrollView style={styles.container}>

        <Text variant='headlineMedium' style={styles.title}>
            George's Meds
        </Text>

        <Text variant='bodySmall' style={styles.subtitle}>
            {medications.length} medications loaded from SQL Server
        </Text>

        {!!error && <Text style={{color: '#ff0000'}}>{error}</Text>}

        {loading && <ActivityIndicator animating size="large" style={{ marginTop: 80 }} />}

        {medications.map(med => (
        <Card
            key={String(med.Medication_ID)}
            style={styles.card}
            onPress={() => navigation.navigate("Details", { item: med })}
        >
            <Card.Title
                title={med.ProductName}
                subtitle={`${med.ActiveIngredient || 'No active ingredient listed'} • ${med.DosageForm_Ref || 'Form unknown'}`}
            />
            <Card.Content>
                <Text variant="bodyMedium">{med.CodexDescriptor}</Text>
                <Text variant="bodySmall" style={{ marginTop: 8, color: '#666' }}>
                    Strength: {med.Strength || 'N/A'}  •  AUD ${med.AUDPerStrip ?? '?'}/strip
                </Text>
                <Text variant="bodySmall" style={{ color: '#888' }}>
                    Category: {med.Category_Ref}
                </Text>
            </Card.Content>
        </Card>
        ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#e8f4ff'
    },
    title: {
        marginBottom:4,
        fontWeight: 'bold',
        color: '#1a3a5c',
    },
    subtitle: {
        marginBottom:16,
        color: '#666',
    },
    button: {
        marginTop: 8,
        backgroundColor: '#1a73e8',
    },
    card: {
        marginBottom: 12,
        elevation: 3,
    },
});
