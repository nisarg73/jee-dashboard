from api.models import Item
import csv

file = open('API_Data_v3.csv')

temp = csv.reader(file)

temp = [i for i in temp]

objects = [
    Item(
        year=int(item[0]),
        round_no=int(item[1]),
        quota=item[2],
        pool=item[3],
        institute_full=item[4],
        institute_short=item[5],
        institute_location=item[6],
        program_name=item[7],
        program_duration=item[8],
        degree_full=item[9],
        degree_short=item[10],
        category=item[11],
        opening_rank=int(item[12]),
        closing_rank=int(item[13]),
        is_preparatory=int(item[14])
    ) for item in temp[1:]
]

Item.objects.bulk_create(objects)