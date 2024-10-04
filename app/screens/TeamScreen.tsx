import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface Team {
    name: string;
    logo: string;
    players: string[];
    stats: {
        wins: number;
        losses: number;
        ties: number;
    };
}

interface TeamScreenProps {
    route: {
        params: {
            team: Team;
        };
    };
}

const TeamScreen: React.FC<TeamScreenProps> = ({ route }) => {
    const { team } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: team.logo }} style={styles.logo} />
            <Text style={styles.title}>{team.name}</Text>
            <Text style={styles.subtitle}>Players:</Text>
            <View style={styles.playersContainer}>
                {team.players.map((player, index) => (
                    <Text key={index} style={styles.player}>{player}</Text>
                ))}
            </View>
            <Text style={styles.subtitle}>Stats:</Text>
            <Text style={styles.stat}>Wins: {team.stats.wins}</Text>
            <Text style={styles.stat}>Losses: {team.stats.losses}</Text>
            <Text style={styles.stat}>Ties: {team.stats.ties}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 8,
    },
    playersContainer: {
        marginBottom: 16,
    },
    player: {
        marginBottom: 4,
    },
    stat: {
        marginBottom: 4,
    },
});

export default TeamScreen;
