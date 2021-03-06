import csv
import ast
import pymongo
from datetime import datetime
from dateutil import parser


def make_advanced_db(file_name = "data/tracks.csv", url = 'mongodb://localhost:27017/', db_name = 'sbp'):
    client = pymongo.MongoClient(url)
    db = client[db_name]
    tracks = []
    with open(file_name, 'r', encoding = 'cp850') as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            artists = []
            for artist_id in row["id_artists"]:
                if len(ast.literal_eval(row['id_artists'])) > 0:
                    artist = get_artist_by_id(artist_id)
                    artists.append(artist)
                    break
            row['artists'] = artists
            track = get_track(row)
            print(track)
            tracks.append(track)

    db['tracks'].insert_many(tracks)


def get_artist(row) -> dict:
    # flw_converted = int(float(row['followers'])) if row['followers'] else 0,
    return {
        '_id': row['id'],
        'followers': int(float(row['followers'])) if row['followers'] else 0,
        'genres': ast.literal_eval(row['genres']),
        'name': row['name'],
        'popularity': int(row['popularity']),
    }

def add_tracks_to_db(file_name = "data/tracks.csv", url = 'mongodb://localhost:27017/', db_name = 'sbp'):
        client = pymongo.MongoClient(url)
        db = client[db_name]
        tracks = []
        with open(file_name, 'r', encoding = 'cp850') as csv_file:
            reader = csv.DictReader(csv_file)
            for row in reader:
                track = get_track(row)
                # print(track)
                tracks.append(track)

        db['tracks'].insert_many(tracks)


def get_artist_by_id(id: str) -> dict:
    # for artist in artists:
    #     if artist['id'] == id:
    #         return artist
    with open('data/artists.csv', 'r', encoding = 'cp850') as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            if row['id'] == id:
                return {
                    '_id': row['id'],
                    'followers': int(float(row['followers'])) if row['followers'] else 0,
                    'genres': ast.literal_eval(row['genres']),
                    'name': row['name'],
                    'popularity': int(row['popularity']),
                }

    # if row['id'] == id:
    #     return {
    #         '_id': row['id'],
    #         'followers': int(float(row['followers'])) if row['followers'] else 0,
    #         'genres': ast.literal_eval(row['genres']),
    #         'name': row['name'],
    #         'popularity': int(row['popularity']),
    #     }



def get_track(row) -> dict:
    return {
        '_id': row['id'],
        'name': row['name'],
        'popularity': int(row['popularity']),
        'duration_ms': int(row['duration_ms']),
        'explicit': False if int(row['explicit']) == 0 else True,
        'artists': row['artists'],
        # 'id_artists': ast.literal_eval(row['id_artists']),
        'release_date': parser.parse(row['release_date']+"-01-01" if len(row['release_date']) < 5 else row['release_date']),
        'danceability': float(row['danceability']),
        'energy': float(row['energy']),
        'key': int(row['key']),
        'loudness': float(row['loudness']),
        'mode': bool(row['mode']),
        'speechiness': float(row['speechiness']),
        'acousticness': float(row['acousticness']),
        'instrumentalness': float(row['instrumentalness']),
        'liveness': float(row['liveness']),
        'valence': float(row['valence']),
        'tempo': float(row['tempo']),
        'time_signature': int(row['time_signature']),
    }


