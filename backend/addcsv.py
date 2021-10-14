from api.models import Item
import csv

file = open('API_Data_v8.csv')

temp = csv.reader(file)

temp = [i for i in temp]

objects = [
    Item(
        year=int(item[0]),
        institute_type=item[1],
        round_no=int(item[2]),
        quota=item[3],
        pool=item[4],
        institute_full=item[5],
        institute_short=item[6],
        institute_location=item[7],
        program_name=item[8],
        program_duration=item[9],
        degree_full=item[10],
        degree_short=item[11],
        category=item[12],
        opening_rank=float(item[13]),
        closing_rank=float(item[14]),
        is_preparatory=int(item[15])
    ) for item in temp[1:]
]

Item.objects.bulk_create(objects)