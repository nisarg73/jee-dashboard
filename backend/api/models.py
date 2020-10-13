from django.db import models


class Item(models.Model):
    """
    This model holds information about opening closing ranks of various programs in different IITs.
    """

    year = models.IntegerField()
    institute_type = models.CharField(max_length=3, default="IIT")
    round_no = models.IntegerField()
    quota = models.CharField(max_length=7)
    pool = models.CharField(max_length=31)
    institute_full = models.CharField(max_length=127)
    institute_short = models.CharField(max_length=31)
    institute_location = models.CharField(max_length=31)
    program_name = models.CharField(max_length=255)
    program_duration = models.CharField(max_length=31)
    degree_full = models.CharField(max_length=255)
    degree_short = models.CharField(max_length=31)
    category = models.CharField(max_length=31)
    opening_rank = models.IntegerField()
    closing_rank = models.IntegerField()
    is_preparatory = models.IntegerField()

    def __str__(self):
        """
        Return the string representation of the model
        :return: the string representation of the model
        """

        return f"{self.institute_full}::{self.program_name}::{self.category}::{self.pool}::{self.opening_rank}"
